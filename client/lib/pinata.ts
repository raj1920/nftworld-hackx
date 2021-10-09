export const pinFileToIPFS = (jwt, file, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwt}`);

  var formdata = new FormData();
  formdata.append("file", file, "1.jpeg");
  formdata.append(
    "pinataMetadata",
    JSON.stringify({
      name: "testname",
      keyvalues: {
        exampleKey: "exampleValue",
      },
    })
  );

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
