import React from "react";


export default function Board({ board, handleClick }) {
    

    return (
        <div className="flex justify-center items-center flex-col ">
            {board.map((row, rowIndex) => (
                <div className="flex gap-[10px]" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <button className="bg-[#f2f2f2] mb-[10px] hover:bg-inherit p-10 border-0 rounded-none text-center align-middle text-[50px] h-[100px] w-[100px] cursor-pointer" key={cellIndex} onClick={() => handleClick(rowIndex, cellIndex)}>{cell}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}