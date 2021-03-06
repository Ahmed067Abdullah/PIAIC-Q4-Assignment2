import React from 'react';

const PetCard = ({ pet, onAdopt, onUnadopt, adopted, userAddress, loading }) => {
  return <div key={pet.id} style={{ border: "1px solid black", display: "inline-block", padding: "20px", margin: "10px" }}  >
    <div >
      <h3 >{pet.name}</h3>
    </div>
    <div>
      <img alt="140x140" src={pet.picture} style={{ width: "150px" }} />
      <br /><br />
      <strong>Breed</strong>: <span >Golden Retriever</span><br />
      <strong>Age</strong>: <span >3</span><br />
      <strong>Location</strong>: <span >Warren, MI</span><br /><br />
      <div> {adopted}  </div>
      {adopted === "0x0000000000000000000000000000000000000000"
        ? <button type="button" disabled={loading} onClick={() => onAdopt(pet.id)}>Adopt</button>
        : adopted === userAddress
          ? <button type="button" disabled={loading} onClick={() => onUnadopt(pet.id)}>Unadopt</button>
          : <div>Already Adopted</div>
      }
    </div>
  </div>;
};

export default PetCard;