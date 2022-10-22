import { useState } from 'react';
import { FlatList } from "react-native"

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

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
            <GroupCard title={item} />
          )
        }}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={()=> (
          <ListEmpty message="How about registering the first class?" />
        )}
      />

      <Button title='Create new class' />
    </Container>
  );
}
