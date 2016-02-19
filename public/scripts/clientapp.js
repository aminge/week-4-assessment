$(document).ready(function(){
    loadAnimals();
    $('#submit-animal').on('click', submitAnimal);
});

function loadAnimals(){
    $.ajax({
        type: 'GET',
        url: '/getanimals',
        success: function(data){
            for (var i = 0; i < data.length; i++){
                appendDom(data[i]);
            }
        },
        error: function(){
            console.log("Failed to retrieve animals from database")
        }
    });
}


function submitAnimal(){
    event.preventDefault();
    var values = {};
    $.each($('#zoo-animal-form').serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

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