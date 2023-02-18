import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; 

function App() {

const listItems = [];
for (let i = 1; i <= 10; i++) {
  listItems.push({ id: i.toString(), label: `Channel ${i}` });
}
  const [dragDropList, setDragDropList] = useState(listItems);

  const onDragComplete = (result) => {
    if (!result.destination) return;

    const DragMixer = [...dragDropList];


    let removedItem = DragMixer.splice(result.source.index, 1)[0];
    DragMixer.splice(result.destination.index, 0, removedItem);


    setDragDropList(DragMixer);
  };

  return (
    <div className="container">
      <div className="card">
        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="drag-drop-list-container">
                {dragDropList.map((item, index) => {
                  const {id, label} = item;
                  return (
                    <div key={id}>
                      <Draggable draggableId={label} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="item-card">
                            <p className="label">{label}</p>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;