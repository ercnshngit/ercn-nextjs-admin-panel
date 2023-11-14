import React, { useState } from "react";

function DescriptionInput({  value }: any) {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <textarea
        defaultValue={value}
        onChange={handleDescriptionChange}
        rows={3}
        style={{
          resize: "vertical", // Otomatik olarak yukarÄ±-aÅŸaÄŸÄ± geniÅŸleyecek
          borderWidth: 1,
          borderColor: "black",
        }}
        className="focus:outline-none p-3 w-full"
      />
    </div>
  );
}

export default DescriptionInput;
