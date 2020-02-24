import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './ColorList.scss';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({ color: '', hex: '' });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const changeHandler = e => {
    e.preventDefault();
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const saveEdit = e => {
    const id = colorToEdit.id;
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(window.alert('Success!  Color updated!'))
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    const confirmed = window.confirm('Are you sure you want to delete this color?');
    if (confirmed) {
      axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(window.alert('Success!  Color deleted!'))
      .catch(err => console.log(err));
    }
    window.location.reload();
  };

  const addColor = () => {
    const newColorObj = { 
      color: newColor.color,
      code: { hex: newColor.hex }
    };
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColorObj)
      .then(res => {
        console.log(res.data);
        window.alert('Success!  New color added!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="add-form">
        <form onSubmit={addColor}>
            <input 
              name='color'
              className='new-color'
              placeholder='Color'
              value={newColor.color}
              onChange={changeHandler}
            />
            <input 
              name='hex'
              className='new-color'
              placeholder='Hex Code'
              value={newColor.hex}
              onChange={changeHandler}
            />
            <button>Submit</button>
          </form>
        {/* stretch - build another form here to add a color */}
      </div>
    </div>
  );
};

export default ColorList;
