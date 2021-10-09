export const pinFileToIPFS = async (jwt, file, name) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwt}`);

  var formdata = new FormData();
  formdata.append("file", file, name);
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

  let response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    requestOptions
  );
  let res = await response.json();

  return res.IpfsHash;
};
