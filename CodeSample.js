export default function AdoptPage({ currentUser, handlePetsOwned, shelters, setShelters }) {

    function handleAdopt(id, type) {

        const shelter_type = type.toLowerCase() === "dog" ? 0 : 1


        //the if statement checks what shelter the pet is in
        if (shelter_type === 0) {

            //updates the pets array of objects 
            const updatePets = shelters[shelter_type].pets.map(p => {
                if (p.id === id) {
                    return {
                        ...p,
                        "adopter_id": currentUser.id,
                        "adopted": true
                    }
                } else {
                    return {
                        ...p
                    }
                }
            });

            //updates the shelter with the updated array of objects
            const updateShelters = shelters.map(shelter => {
                if (shelter.id === 1) {
                    return {
                        ...shelter,
                        "pets": updatePets
                    }
                }

                return shelter
            })

            setShelters(updateShelters)

            fetch(`/pets/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePets.find(pet => pet.id === id)),
            })
                .then((r) => {
                    if (r.ok) {
                        r.json().then(handlePetsOwned)
                    }
                })

        } else if (shelter_type === 1) {

            //updates the pets array of objects

            const updatePets = shelters[shelter_type].pets.map(p => {
                if (p.id === id) {
                    return {
                        ...p,
                        "adopter_id": currentUser.id,
                        "adopted": true
                    }
                } else {
                    return {
                        ...p
                    }
                }
            });

            //updates the shelter with the updated array of objects
            const updateShelters = shelters.map(shelter => {
                if (shelter.id === 2) {
                    return {
                        ...shelter,
                        "pets": updatePets
                    }
                }

                return shelter
            })
            
            //This will update state
            setShelters(updateShelters)
            
            //This will send a request to the backend to update the pet that is being adopted.
            //To change the adopted? to true and to assign an owner id to the pet.
            fetch(`/pets/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePets.find(pet => pet.id === id)),
            })
                .then((r) => {
                    if (r.ok) {
                        r.json().then(handlePetsOwned)
                    }
                })


        }


    }
