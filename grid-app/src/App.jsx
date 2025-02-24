import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'


//Grid Layout:
	// •	Create a 20x20 d (400 cells in total) using React.
	// •	Ensure each grid cell is clickable.
	// 2.	Tile Selection:
	// •	Allow the user to select exactly two tiles: one for the start point and one for the end point.
	// •	Visually distinguish the start tile and end tile using different colors or styles.
	// 3.	Pathfinding Logic:
	// •	Implement the Depth-First Search (DFS) algorithm directly in the frontend to calculate the shortest path between the selected start and end tiles.
	// •	Ensure the algorithm handles 2D grid traversal properly.
	// 4.

function App() {
   const rows=20
   const cols=20
   const [start,setStart]=useState(null)
   const[end,setEnd]=useState(null)
  //  const grid=Array.from({length:rows},()=>
  // Array(cols).fill(0))
   const [grid,setGrid]=useState(Array.from({length:rows},()=>
    Array(cols).fill('empty')))

   
   const findfspath =(start,end)=>{
     let shortestPath=[]
     let seen=new Set()
     const moves=[[0,1],[0,-1],[1,0],[-1,0]]

     const dfs=(row,col,path)=>{
      if(row===end.row && col=== end.col){
        if(shortestPath===0 || path.length<shortestPath.length){
          shortestPath=[...path,{row,col}]
        }
          return
        }
      
      seen.add(`${row},${col}`)
       for(let [dx,dy] of moves){
        let newRow=row+dx
        let newCol=col+dy
        if(newRow >=0 && newRow<rows  &&newCol >=0 && newCol<cols){
          dfs(newRow,newCol,[...path],{row,col})
        }
       }
       seen.delete(`${row},${col}`)
     }
    //  dfs(start.row,start.col,[])
     
  }
 const  handleCellClick =(row,col)=>{
  if(!start){
    setStart({row,col});
    updateGrid(row,col,'start')
  }
  else if(!end){
    setEnd({row,col})
    updateGrid(row,col,'end')
    findfspath(start,{row,col})
  }
 }

 const updateGrid=(row,col,type)=>{
  setGrid((prevGrid)=>{
    const newGrid=prevGrid.map((row)=>[...row])
     newGrid[row][col]=type
     return newGrid
  })
 }

  return (
    <>
    <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(20, 25px)`,
          gridTemplateRows: `repeat(20, 25px)`,
          gap: "0px",
          margin: "20px auto",
          justifyContent: "center",
          padding: "20px",
          border: "2px solid black",
          width: "fit-content"
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleCellClick(rowIdx, colIdx)}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor:
                  cell === "start"
                    ? "green"
                    : cell === "end"
                    ? "red"
                    : "white",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            ></div>
          ))
        )}
      </div>

 
    </>
  )
}

export default App
