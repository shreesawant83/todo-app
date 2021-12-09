import React, { useState, useEffect } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [updateItem, setupdateItem] = useState(null);

  const adddata = () => {
    if (!inputdata) {
      alert("Please Fill Input");
    } else if (inputdata && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === updateItem) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputdata('');
      setupdateItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, allInputData]);
      setInputdata("");
    }
  };
  const deleteItem = (index) => {
    const updateItem = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateItem);
  };
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputdata(newEditItem.name);
    setupdateItem(id);
  };
  const removeAll = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div>
        <h1>Todo- App</h1>
      </div>
      <div className="main-div">
        <div className="inner-div">
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter Text Here"
              onChange={(e) => setInputdata(e.target.value)}
              value={inputdata}
            />
            {toggleSubmit ? (
              <button onClick={adddata}>ADD</button>
            ) : (
              <button onClick={() => adddata()}>Edit</button>
            )}
          </div>
          <div className="show-items">
            {items.map((elem) => {
              return (
                <div className="each-item" key={elem.id}>
                  <p>{elem.name}</p>
                  <button onClick={() => editItem(elem.id)}>Edit</button>
                  <button onClick={() => deleteItem(elem.id)}>Delete</button>
                </div>
              );
            })}
          </div>
          <div>
            <button onClick={removeAll}>Delete All</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
