function buscarPrevisao() {
    const cidade = document.getElementById("cityInput").value;
    const apiKey = document.getElementById("apiKeyInput").value;
  
    if (cidade === "") {
      alert("Por favor, digite o nome da cidade!");
      return;
    }
  
    const urlAPI = `https://community-open-weather-map.p.rapidapi.com/weather?q=${cidade}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": apiKey // Substitua por sua chave válida        
      }      
    };
    console.log(options);
    fetch(urlAPI, options)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            const resultado = formatarResultado(data); // Função para formatar dados
            document.getElementById("weather-result").innerHTML = resultado;
          });
        } else {
          console.error("Erro na requisição:", response.status);
          alert("Erro ao buscar dados da previsão do tempo.");
        }
      })
      .catch(err => {
        console.error("Erro:", err);
        alert("Falha ao conectar com o serviço de previsão do tempo.");
      });
  }
  
  // Função para formatar dados da previsão do tempo (implemente de acordo com sua necessidade)
  function formatarResultado(data) {
    // Exemplo: retorne uma string com temperatura, descrição e data
    const dataFormatada = new Date(data.dt * 1000);
    return `
      <h2>Previsão do Tempo para ${data.name}</h2>
      <p>Temperatura: ${data.main.temp}°C - ${data.weather[0].description}</p>
      <p>Data: ${dataFormatada.toLocaleDateString()}</p>
    `;
  }
  