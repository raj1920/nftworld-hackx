import React from "react";
import { pinFileToIPFS } from "../../lib/pinata";
import Navbar from "../../components/navbar";
import { createPost } from "../../lib/api";

export default function NewPost() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });

  const onSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("authUser"));
    let hash = await pinFileToIPFS(
      token.user.pinata_jwt,
      selectedFile,
      selectedFile.name
    );

    await createPost({
      title: values.title,
      description: values.description,
      asset_link: `https://gateway.pinata.cloud/ipfs/${hash}`,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-8 py-8 bg-gray-100 md:h-screen">
          <h1 className="text-xl font-bold mb-6">Create New Post</h1>
          <div className="border-dotted border-2 border-black flex flex-col justify-center items-center py-12 rounded-lg mb-12">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} className="w-56" />
            ) : (
              <>
                <p className="font-bold mb-1">Upload File</p>
                <p className="text-xs mb-6 max-w-sm text-center">
                  Accepted file types (JPG, PNG, MOV, MP4, GIF) Max upload size
                  30MB
                </p>
                <label className="py-2 cursor-pointer px-3 rounded-full text-sm flex bg-blue-500 text-white">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept="image/*,video/*,audio/*"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add File
                </label>
              </>
            )}
          </div>
          <div className="flex w-full">
            <h1 className="text-xl tracking-wide flex-grow">
              List post on marketplace
            </h1>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="px-8 py-8">
          <h1 className="text-xl font-bold mb-2">NFT Details</h1>
          <p className="text-xs text-gray-500 mb-8">
            Complete the following details before your post is listed on the
            marketplace.
          </p>
          <p className="mb-2">Title</p>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg py-2 px-2 mb-6"
            placeholder="Enter title about your art..."
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <p className="mb-2">Description</p>
          <textarea
            rows={4}
            className="w-full border-2 border-gray-200 rounded-lg py-2 px-2 mb-6"
            placeholder="Enter description about your art..."
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
          <hr />
          <div className="mt-6 flex items-center">
            <button
              className="rounded-full bg-blue-500 text-white py-2 px-4 mx-auto"
              onClick={onSubmit}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
