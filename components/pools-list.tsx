import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { asset_list } from '@chain-registry/osmosis';
import { observer } from "mobx-react-lite"
import PoolsCard from './pools-card';

interface PoolsData {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}


function ListPools({moxbStore}) {

  useEffect(() => {
    const getShuffledArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };

    const allTokens = asset_list.assets.map(({ name, logo_URIs }) => ({
      name: name,
      imgSrc: logo_URIs.png,
    }));
    const poolOptionToken1 = getShuffledArr([...allTokens]);
    const poolOptionToken2 = getShuffledArr([...allTokens]).filter(
      (v, i) => v !== poolOptionToken1[i]
    );
    const getRandomId = getShuffledArr(
      [...Array(500)].map((v, i) => (v = i + 1))
    ).slice(0, 100);

    const getRandomPoolLiquidity = [...Array(100)].fill(undefined).map((_) => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .replaceAll(",", "")
      );
    });

    const getRandomMyLiquidity = [...Array(100)].fill(undefined).map((_) => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .slice(0, 5)
          .replaceAll(",", "")
      );
    });

    const getRandomAPR = [...Array(100)].fill(undefined).map((_) => {
      return (
        parseInt(
          getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .slice(0, 7)
            .replaceAll(",", "")
        ) / 100
      );
    });

    const getDefaultData = [...Array(100)].fill(undefined).map((_, i) => ({
      id: getRandomId[i],
      token1: poolOptionToken1[i],
      token2: poolOptionToken2[i],
      poolLiquidity: getRandomPoolLiquidity[i],
      apr: getRandomAPR[i],
      myLiquidity: getRandomMyLiquidity[i],
      myBoundedAmount: getRandomMyLiquidity[i],
      longestDaysUnbonding: Math.random() < 0.5,
    }));

    setPoolsData(getDefaultData);
    moxbStore.initData(getDefaultData.slice(0,4));
    setCount(4);

  }, []);


  const [count, setCount] = useState(0);
  const [showFlags, setShowFlags] = useState(false);
  const [poolsData, setPoolsData] = useState<PoolsData[]>([]);

  const addAasset = ()=>{
    moxbStore.addAsset(poolsData.slice(count,count+1));
   setCount(count+1);
  }
  
  const handleRemove =(id) =>{
    moxbStore.removeAsset(id);
  }

  const handleUpdate =(id) =>{
    moxbStore.updateAsset(id);
  }

  const handleAddpool =()=>{
    setShowFlags(true);
    moxbStore.addPool(poolsData.slice(0,2));
  }

return (
  <>
  <Box p={4}>
    <Flex align="center" mb={6}>
      <Button display={{ base: "none", sm: "block" }} onClick={handleAddpool}>Create New Pool</Button>
    </Flex>
    <Box
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      m={-4}
      px={4}
      py={6}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        My Pools
      </Text>
      <Button 
      display={{ base: "none", sm: "block" }} 
      border="1px solid"
      borderColor="#000"
      onClick={addAasset}>add</Button>
        <PoolsCard data={moxbStore.data} handleRemove={handleRemove} handleUpdate={handleUpdate} Flags={true}/>
    </Box>
  </Box>
  { showFlags &&
    <Box p={4}>
    <Box
      m={-4}
      px={4}
      py={6}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        new Pools
      </Text>
        <PoolsCard data={moxbStore.poolData} Flags={false}/>
    </Box>
  </Box>
  }
  </>
);
  
}

export default observer(ListPools);
