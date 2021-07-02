import React from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import Character from './Assets/Images/mycomics-TransChar1.png';
import './App.css';

const MovableItem = ({img, setIsFirstColumn}) => {
  const [{ isDragging }, drag] = useDrag({
      type: 'Our first type',
      item: { name: 'Any custom name', /*type: 'Our first type'*/ },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if(dropResult && dropResult.name === 'Column 1'){
          setIsFirstColumn(true)
        }  else {
          setIsFirstColumn (false);
        }
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
      <div ref={drag} className='character'  style={{  opacity }}>
          <img src={img} />
      </div>
  )
}



const Column = ({children, className, title}) => {
  const [, drop] = useDrop({
    accept: 'Our first type',
    drop: ()=> ({name: title}),
  });

  return (
      <div ref={drop} className={className}>
          {title}
          {children}
      </div>
  )
}

export const App = () => {
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const Item = <MovableItem img={Character} setIsFirstColumn={setIsFirstColumn} />; // what happen here?
console.log(setIsFirstColumn);
  return (
   
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <Column title="Column 1" className= 'column first-column'>
            {isFirstColumn && Item}
          </Column>
          <Column title="Column 2" className= 'column second-column'>
            {!isFirstColumn && Item}
            {/* {null} */}
          </Column>
        </DndProvider>
      </div>
  );
}
export default App;
