import React, { useCallback, useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import { db } from "utils/firebase";
import { IRoute } from "../Map/types";

const useLogic = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [routes, setRoutes] = useState<{ href: string; data: IRoute }[]>([]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.currentTarget.value.toLowerCase());
    },
    [setSearchValue]
  );

  useEffect(() => {
    if (searchValue) {
      db.collection("routes")
        .orderBy("nickname")
        .startAt(searchValue)
        .endAt(`${searchValue}\uf8ff`)
        .limit(3)
        .get()
        .then(({ docs }) =>
          setRoutes(
            docs.map(doc => ({
              href: `/map?mapId=${doc.id}`,
              data: doc.data() as IRoute,
            }))
          )
        );
    }
  }, [searchValue, setRoutes]);

  const color = useColorModeValue("white", "gray.800");
  const secondaryColor = useColorModeValue("gray.100", "gray.900");

  return { color, secondaryColor, handleChange, routes };
};

export default useLogic;
