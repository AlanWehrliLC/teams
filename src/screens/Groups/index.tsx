import { useState, useCallback } from 'react';
import { FlatList } from "react-native"
import {useNavigation, useFocusEffect} from "@react-navigation/native"

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupGetAll } from '@storage/group/groupGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate("new")
  }

  async function fetchGroups(){
    try {
      const data = await groupGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate("players", {group})
  }

  useFocusEffect(useCallback(()=>{
    fetchGroups()
  },[]))

  return (
    <Container>
      <Header />

      <Highlight 
        title='Classes'
        subtitle='play with your class'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item})=>{
          return (
            <GroupCard 
              title={item}
              onPress={()=>handleOpenGroup(item)}
            />
          )
        }}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={()=> (
          <ListEmpty message="How about registering the first class?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button 
        title='Create new class'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
