import React, { useState, useEffect } from "react";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;

const App = () => {
  const [fontSize, setFontSize] = useState(30);
  const [currentId, setId] = useState(1);
  const [imageSize, setImgSize] = useState(100);
  const [backgroundColor, setBackground] = useState("#f2f2f2");
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };
  const handleImageChange = (e) => {
    setImgSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setBackground(e.target.value);
  };
  const handleDeleteItem = () => {
    const dropzone = document.getElementById("dropzone");
    const elementToRemove = document.getElementById(currentId);
    if (elementToRemove) {
      const prevSelectedElement =
        document.querySelector(`[data-selected=true]`);
      if (prevSelectedElement) {
        prevSelectedElement.style.border = "none";
        prevSelectedElement.removeAttribute("data-selected");
      }

      dropzone.removeChild(elementToRemove);
    }
  };
  useEffect(() => {
    const el = document.getElementById(currentId);
    if (el) {
      el.style.fontFamily = selectedFont;
    }
  }, [selectedFont]); // xử lý font chữ
  useEffect(() => {
    const el = document.getElementById(currentId);
    if (el && el.id !== "dropzone") {
      el.style.width = imageSize + "px";
    }
  }, [imageSize]); // xử lý image size
  useEffect(() => {
    const el = document.getElementById(currentId);
    if (el) {
      el.style.fontSize = fontSize + "px";
    }
  }, [fontSize]); // xử lý font size
  useEffect(() => {
    const el = document.getElementById(currentId);
    if (el) {
      el.style.backgroundColor = backgroundColor;
    }
  }, [backgroundColor]); // xử lý background color
  useEffect(() => {
    const dropzone = document.getElementById("dropzone");
    dropzone.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = e.target;

      setId(targetElement.id);
      const prevSelectedElement =
        document.querySelector(`[data-selected=true]`);
      if (prevSelectedElement) {
        prevSelectedElement.style.border = "none";
        prevSelectedElement.removeAttribute("data-selected");
      }

      targetElement.style.border = "2px solid red";
      targetElement.setAttribute("data-selected", true);
    });
    dropzone.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    dropzone.addEventListener("drop", function (e) {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const element = document.getElementById(data);

      if (element && element.id.startsWith("c")) {
        element.style.position = "absolute"; // Position the element absolutely for proper positioning
        element.style.left =
          e.clientX - dropzone.offsetLeft - element.offsetWidth / 2 + "px";
        element.style.top =
          e.clientY - dropzone.offsetTop - element.offsetHeight / 2 + "px";
        dropzone.appendChild(element); // Move the element within the drop zone

        // Add event listener for drag start on the element
        element.addEventListener("dragstart", function (e) {
          e.dataTransfer.setData("text/plain", e.target.id);
        });

        // Add event listener for drag end on the element
        element.addEventListener("dragend", function (e) {
          const target = e.target;
          target.style.left =
            e.clientX - dropzone.offsetLeft - target.offsetWidth / 2 + "px";
          target.style.top =
            e.clientY - dropzone.offsetTop - target.offsetHeight / 2 + "px";
        });
      } else {
        const clone = element.cloneNode(true);
        clone.id = "c_" + Math.random();
        clone.style.position = "absolute";
        clone.style.left =
          e.clientX - dropzone.offsetLeft - element.offsetWidth / 2 + "px";
        clone.style.top =
          e.clientY - dropzone.offsetTop - element.offsetHeight / 2 + "px";
        clone.draggable = true;
        dropzone.appendChild(clone);
        clone.addEventListener("dragstart", function (e) {
          e.dataTransfer.setData("text/plain", e.target.id);
        });
        clone.addEventListener("dragend", function (e) {
          const target = e.target;
          target.style.left =
            e.clientX - dropzone.offsetLeft - target.offsetWidth / 2 + "px";
          target.style.top =
            e.clientY - dropzone.offsetTop - target.offsetHeight / 2 + "px";
        });
      }
    });

    const draggables = document.querySelectorAll(".draggable");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", e.target.id);
      });
    });
  }, []); // xử lý kéo thả

  return (
    <Layout
      style={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sider id="sider">
        <p
          className="draggable"
          id="text"
          draggable="true"
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          edit
        </p>

        <div>
          <img
            className="draggable"
            id="drag2"
            src="https://images.rawpixel.com/image_png_600/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHUyMzMxNjM2LWltYWdlLTAxLXJtNTAzXzMtbDBqOXFrNnEucG5n.png"
            draggable="true"
            alt="Image"
          />
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
          }}
        >
          <select
            className="form-select"
            aria-label="Select Font"
            value={selectedFont}
            onChange={handleFontChange}
          >
            <option value="Arial">Arial</option>
            <option value="Anta">Anta</option>
            <option value="Poppins">Poppins</option>
          </select>
          <span> Font size </span>
          <input
            type="number"
            onChange={handleFontSizeChange}
            value={fontSize}
          />
          <span>Image size</span>

          <input type="number" onChange={handleImageChange} value={imageSize} />
          <span> Background</span>

          <input
            type="color"
            value={backgroundColor}
            onChange={handleColorChange}
          />
          <button
            onClick={handleDeleteItem}
            style={{ marginLeft: "10px", padding: "10px" }}
          >
            Xóa
          </button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div id="dropzone"></div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
