import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'cha',
    title: 'chaaracter',
    data: [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      thumb: '/images/gary.png'
    },
    {
      id: 'cato',
      name: 'Little Cato',
      thumb: '/images/cato.png'
    },
    {
      id: 'kvn',
      name: 'KVN',
      thumb: '/images/kvn.png'
    },
    {
      id: 'mooncake',
      name: 'Mooncake',
      thumb: '/images/mooncake.png'
    },
    {
      id: 'quinn',
      name: 'Quinn Ergon',
      thumb: '/images/quinn.png'
    }

    ], 
  }, {
    id: 'cha_1',
    title: 'chaaracter___1',
    data: [
      {
        id: 'gary1',
        name: 'Gary Goodspeed1',
        thumb: '/images/gary_1.png'
      },
      {
        id: 'cato1',
        name: 'Little Cato1',
        thumb: '/images/cato_1.png'
      },
      {
        id: 'kvn1',
        name: 'KVN1',
        thumb: '/images/kvn_1.png'
      },
      {
        id: 'mooncake1',
        name: 'Mooncake1',
        thumb: '/images/mooncake_1.png'
      },
      {
        id: 'quinn1',
        name: 'Quinn Ergon1',
        thumb: '/images/quinn_1.png'
      }
    ]
  }, {
    id: 'cha_2',
    title: 'chaaracter___2',
    data: [
      {
        id: 'gary2',
        name: 'Gary Goodspeed2',
        thumb: '/images/gary_2.png'
      },
      {
        id: 'cato2',
        name: 'Little Cato2',
        thumb: '/images/cato_2.png'
      },
      {
        id: 'kvn2',
        name: 'KVN2',
        thumb: '/images/kvn_2.png'
      },
      {
        id: 'mooncake2',
        name: 'Mooncake2',
        thumb: '/images/mooncake_2.png'
      },
      {
        id: 'quinn2',
        name: 'Quinn Ergon2',
        thumb: '/images/quinn_2.png'
      }
    ]
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    console.log('result: ', result)
    // if (!result.destination) return;

    // const items = Array.from(characters);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // updateCharacters(items);

    const reorderedCate = characters.filter(item => item.id === result.source.droppableId)
    const reorderedItem = reorderedCate[0].data.find((item, index) => index === result.source.index)
    const updated = characters.map(cate => {
      if(cate.id === result.source.droppableId) {
        const tasks = cate.data.filter((item, index) => index !== result.source.index)
        return {...cate, data: tasks}
      } else if(cate.id === result.destination.droppableId) {
        const tasks = cate.data;
        tasks.splice(result.destination.index, 0, reorderedItem);
        return {...cate, data: tasks}
      } else
        return cate
    })
    console.log("updated: ", updated)
    updateCharacters(updated)
  }

  return (
    <div className="App">
      <header className="App-header" style={{flexDirection: 'row'}}>
        {/* <h1>Final Space Characters</h1> */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          { characters.map(item => (
            <div style={{border: '1px solid gray', padding: '10px', margin: '0 10px'}}>
              <span>{item.title}</span>
              <Droppable droppableId={item.id} key={item.id}>
                {(provided) => (
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {item.data.map(({id, name, thumb}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className="characters-thumb">
                                <img src={thumb} alt={`${name} Thumb`} />
                              </div>
                              <p>
                                { name }
                              </p>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default App;
