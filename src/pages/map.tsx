import { Box, Center } from "@chakra-ui/layout";

import { useEffect, useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import { Spinner } from "@chakra-ui/spinner";
import { db, storage } from "utils/firebase";
import { IRoute } from "components/map";
import { useRouter } from 'next/router'
import firebase from "utils/firebase";

const Map = () => {
  const { query } = useRouter();
  const { mapId } = query as { mapId: string };
  const [route, setRoute] = useState<IRoute>();

  useEffect(()=>{
    mapId && db.collection("routes").doc(mapId || "").get()
    .then(doc => doc.exists ? doc.data() as IRoute : Promise.reject("Rota não encontrada"))
    .then(data => Promise.all(
          data.pointers.map(pointer => 
            storage.ref(`/routes/${mapId}/${pointer.avatar_url}`)
            .getDownloadURL()
        )
      ).then((pointersUrl) => 
        storage.ref(`/routes/${mapId}/${data.avatar_url}`)
        .getDownloadURL()
        .then((res) =>
          setRoute({
            ...data,
            avatar_url: res,
            pointers: data.pointers.map((pointer, index) => ({...pointer, avatar_url: pointersUrl[index]}) )
          })
        )
      )
    );
  }, [mapId]);
  

  const Map = useMemo(() => dynamic(
    () => import('components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Center><Spinner size="xl" /></Center>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  
  return (
    <Box mb={8} flex="1">
      {route && <Map route={route} reference={db.collection("routes").doc(mapId || "") as firebase.firestore.DocumentReference<IRoute>} />}
    </Box>
  );
};

export default Map;
