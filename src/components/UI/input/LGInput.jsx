import React from 'react'

function LGInput({ value, onChange,placeholder,style}) {
  return (
    <div style={style}> <input
    placeholder={placeholder}
        style={{
            width: "100%",
            backgroundColor: "#212122",
            padding: 10,
            border: "none",
            borderRadius: 10,
            color: "white",
        }}
     
        value={value}
        onChange={onChange}

        // value={data.username}
    /></div>
  )
}

export default LGInput