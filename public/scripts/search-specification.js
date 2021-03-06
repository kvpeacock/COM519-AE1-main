const specificationViewNotSignedIn = (specification) => `
    <tr>
        <td>${specification.manufacturer} ${specification.model} ${specification.submodel}</td>
        <td>${specification.year}</td>
        <td>${specification.body_style}</td>
        <td>${specification.doors}</td>
        <td>${specification.mass}</td>
        <td>${specification.engine_displacement}</td>
        <td>${specification.engine_arrangement}</td>
        <td>${specification.power}</td>
        <td>${specification.torque}</td>
        <td>${specification.fuel_type}</td>
        <td>${specification.drivetrain}</td>
        <td>${specification.gears}</td>
        <td>${specification.transmission}</td>
        <td>${specification.acceleration}</td>
        <td>${specification.top_speed}</td>
        <td>${specification.combined_mpg}</td>
        <td>${specification.insurance_group}</td>
        <td>${specification.luggage_capacity}</td>
        <td>${specification.average_used_price}</td>
        <td class="text-center"><a href="/specifications/update/${ specification._id }" class='editButton'><span class="glyphicon glyphicon-edit"></span> Edit</a> 
        <a href="/specifications/delete/${ specification._id }" class="deleteButton"><span class="glyphicon glyphicon-remove"></span> Del</a>
    </tr>
    
`;

const specificationViewSignedIn = (specification) => `
    <tr>
        <td>${specification.manufacturer} ${specification.model} ${specification.submodel}</td>
        <td>${specification.year}</td>
        <td>${specification.body_style}</td>
        <td>${specification.doors}</td>
        <td>${specification.mass}</td>
        <td>${specification.engine_displacement}</td>
        <td>${specification.engine_arrangement}</td>
        <td>${specification.power}</td>
        <td>${specification.torque}</td>
        <td>${specification.fuel_type}</td>
        <td>${specification.drivetrain}</td>
        <td>${specification.gears}</td>
        <td>${specification.transmission}</td>
        <td>${specification.acceleration}</td>
        <td>${specification.top_speed}</td>
        <td>${specification.combined_mpg}</td>
        <td>${specification.insurance_group}</td>
        <td>${specification.luggage_capacity}</td>
        <td>${specification.average_used_price}</td>
        <td class="text-center"><a href="/specifications/update/${ specification._id }" class='editButton'><span class="glyphicon glyphicon-edit"></span> Edit</a> 
        <a href="/specifications/delete/${ specification._id }" class="deleteButton"><span class="glyphicon glyphicon-remove"></span> Del</a>
        <a href="#" class="editButton" onclick="handleSave('${specification._id}')">Save</a></td>
    </tr>
    
`;

const tableHeaders = `
<thead>
    <tr>
        <td>Vehicle</td>
        <td>Year</td>
        <td>Body Style</td>
        <td>Doors</td>
        <td>Mass</td>
        <td>Displacement</td>
        <td>Arrangement</td>
        <td>Power</td>
        <td>Torque</td>
        <td>Fuel</td>
        <td>Drivetrain</td>
        <td>Gears</td>
        <td>Transmission</td>
        <td>0-60</td>
        <td>Top Speed</td>
        <td>Combined MPG</td>
        <td> Insurance Group</td>
        <td>Luggage Capacity</td>
        <td>Average Used Price</td>
        <td>Options</td>
    </tr>
</thead>`

const handleSubmit = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    const user = document.querySelector("#user").value;
    const specificationDomRef = document.querySelector('#specificationItems');
    try {

        const ref = await fetch(`/api/search-specifications/?search=${searchVal}`);
        const searchResults = await ref.json();
        let specificationHtml = [];
        if (searchResults.length != 0){
            specificationHtml.push(tableHeaders)
        }
        else{
            specificationHtml.push("No results")
        }

        if(user == "false"){
            searchResults.forEach(specification => {
                specificationHtml.push(specificationViewNotSignedIn(specification));     
            })
        }else{
            searchResults.forEach(specification => {
                specificationHtml.push(specificationViewSignedIn(specification));     
            })
        }
        specificationDomRef.innerHTML = specificationHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}

const handleSave = async (id) => {
    await fetch('/saved-specifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
    })
  };