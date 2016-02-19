$(document).ready(function(){
    loadAnimals();
    $('#submit-animal').on('click', submitAnimal);
});

function loadAnimals(){
    $.ajax({
        type: 'GET',
        url: '/getanimals',
        success: function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++){
                appendDom(data[i]);
            }
        }
    })
    // ajax call to get an array of all of the animals in the database
    // append the animals in the array to the DOM (in the animal-list)
}


function submitAnimal(){
    event.preventDefault();
    var values = {};
    $.each($('#zoo-animal-form').serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    console.log(values);

    $('#zoo-animal-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/submitanimal',
        data: values,
        success: function(data){
            appendDom(data);
        },
        error: function(){
            console.log('Animal failed to submit to database');
        }
    });
}

function appendDom(animal){
    $('#animal-list').append('<li>' + animal.animal_amount + ' ' + animal.animal_type + 's</li>');
}