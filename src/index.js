import $ from 'jquery';

'use strict';

// const apiKey = '6cffa0f2d84f4aeabf7ec622e910dc4b'

const searchURL = 'https://api.github.com/users';


function formatQueryParams(params) {
  return `$:{encodeURIComponent(param)}/repo}`
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.articles.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      <img src='${responseJson.articles[i].urlToImage}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '/' + queryString;

  console.log(url);

  // const options = {
  //   headers: new Headers({
  //     "X-Api-Key": apiKey})
  // };

  // fetch(url, options)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);