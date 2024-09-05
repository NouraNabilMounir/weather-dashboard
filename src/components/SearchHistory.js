import React from 'react';

class SearchHistory extends React.Component {
  state = {
    history: [],
  };

  componentDidMount() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    this.setState({ history: searchHistory });
  }

  render() {
    const { history } = this.state;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-4">Search History</h2>
          {history.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {history.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No searches have been made yet. Try searching for some weather data!</p>
          )}
        </div>
      </div>
    );
  }
}

export default SearchHistory;
