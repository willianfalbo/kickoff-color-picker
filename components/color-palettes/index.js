import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';

import ColorPicker from "../color-picker";
import s from "./styles.module.css";

const ColorPalette = () => {
  const [colorPalettes, setColorPalettes] = useState([]);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const fetchColorPalettes = async () => {
    const { status, data } = await axios.get("/api/color-palettes");

    if (status === 200) {
      const newPalettes = [
        ...data.sort((a, b) => { return a.id - b.id; })
      ];
      setColorPalettes(newPalettes);
    } else {
      throw new Error("Error while getting color palettes.");
    }
  };

  const handlePaletteChange = (color, index) => {
    const newPalettes = [...colorPalettes];
    newPalettes[index].hex_color = color.hex;

    setColorPalettes(
      newPalettes
    );
  }

  const handlePaletteChangeComplete = async (color, index) => {
    const { status } = await axios.put("/api/color-palettes", {
      ...colorPalettes[index],
      hex_color: color.hex
    });

    if (status === 200) {
      handlePaletteChange(color, index);
    } else {
      throw new Error("Error while updating color palette.");
    }
  }

  const handlePaletteDelete = async (index) => {
    const { status } = await axios.delete("/api/color-palettes", {
      data: {
        id: colorPalettes[index].id
      }
    });

    if (status === 204) {
      const newPalettes = [...colorPalettes];
      newPalettes.splice(index, 1);

      setColorPalettes(newPalettes);
    } else {
      throw new Error("Error while deleting color palette.");
    }
  }

  const handlePaletteAdd = async () => {
    const { status, data } = await axios.post("/api/color-palettes", {
      hex_color: '#FFFFFF'
    });

    if (status === 200) {
      const newPalettes = [
        ...colorPalettes, data
      ];

      setColorPalettes(newPalettes);
    } else {
      throw new Error("Error while adding color palette.");
    }
  }

  return (
    <div className={s.colorPaletteContainer}>
      {
        colorPalettes && colorPalettes.map((item, index) => {
          const customPickerStyle = {
            colorWrapper: {
              display: 'inline-block',
              cursor: 'pointer',
              textAlign: 'center',
            },
            color: {
              width: '115px',
              height: '175px',
              borderRadius: '4px',
              border: '1px solid #d6d6d6',
              background: `${item.hex_color}`,
              margin: '1px',
            },
          };

          return (
            <div key={index}>
              <ColorPicker
                key={index}
                color={{ hex: item.hex_color }}
                onChange={(item) => handlePaletteChange(item, index)}
                onChangeComplete={(item) => handlePaletteChangeComplete(item, index)}
                style={customPickerStyle} />
              <FaRegTrashAlt
                onClick={() => handlePaletteDelete(index)}
                style={{ cursor: 'pointer' }} />
            </div>
          )
        })
      }
      {
        colorPalettes && colorPalettes.length < 5 &&
        <FaPlus onClick={handlePaletteAdd} className={s.plusIcon} size={19} />
      }
      {
        colorPalettes && colorPalettes.length <= 0 &&
        <div onClick={handlePaletteAdd} className={s.plusIcon}> Add Color Palette</div>
      }
    </div>
  );
};

export default ColorPalette;
