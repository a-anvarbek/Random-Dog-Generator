const dogApiResponseObj = {
    message: "https://images.dog.ceo/breeds/terrier-tibetan/n02097474_6113.jpg",
    status: "success",
  };
  
  console.log(dogApiResponseObj?.message?.split("/")[4]);
  