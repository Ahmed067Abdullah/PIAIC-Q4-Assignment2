import React, { useEffect } from 'react';
import { adoptPet, loadAdopters, unadoptPet } from './Pets.slice';
import classes from './Pets.module.css'
import { useDispatch, useSelector } from 'react-redux';
import petListJson from '../../pets.json';
import PetCard from '../../components/PetCard/PetCard';

const Pets = () => {
  const address = useSelector((state) => state.main.address);
  const adoptersList = useSelector((state) => state.pets.adopters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdopters());

    // Refresh data after 30 seconds
    setInterval(() => dispatch(loadAdopters()), 30000)
  }, []);


  return <div>
    <div className={classes['heading']}>Welcome to Petshop<span> {address} </span> </div>
    <div className={classes['pets-container']}>
      {petListJson.map(pet => <PetCard
        key={pet.id}
        pet={pet}
        adopted={adoptersList[pet.id]}
        userAddress={address}
        onAdopt={id => dispatch(adoptPet(id))}
        onUnadopt={id => dispatch(unadoptPet(id))} />)}
    </div>
  </div>
};

export default Pets;