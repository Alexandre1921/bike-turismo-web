import { Box, Center, Divider, Heading } from "@chakra-ui/layout";

import { useEffect, useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import { Spinner } from "@chakra-ui/spinner";
import { db } from "utils/firebase";
import { IRoute } from "components/map";
import { useRouter } from 'next/router'

const Map = () => {
  const { query } = useRouter();
  const { mapId } = query as { mapId: string };
  const [route, setRoute] = useState<IRoute>();

  useEffect(()=>{
    mapId && db.collection("routes").doc(mapId || "").get().then(doc => doc.exists && setRoute(doc.data() as IRoute));
  }, [mapId]);
  

  const Map = useMemo(() => dynamic(
    () => import('components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Center><Spinner size="xl" /></Center>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return (
    <Box mb={8} w="full" h="full">
      {route && <Map route={route} />}
    </Box>
  );
};

export default Map;
