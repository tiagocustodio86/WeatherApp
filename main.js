function buscarPrevisao() {
    document.getElementById('weather-result').innerHTML = '';

    var cidade = document.getElementById('cityInput').value;
    var apiKey = document.getElementById('apiKeyInput').value;

    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '200') {
                var previsoes = data.list;

                var previsoesPorDia = {};

                previsoes.forEach(previsao => {
                    var dataHora = new Date(previsao.dt * 1000);
                    var dia = dataHora.getDate();
                    var temperatura = previsao.main.temp;
                    var condicao = previsao.weather[0].main;

                    if (!previsoesPorDia[dia]) {
                        previsoesPorDia[dia] = {
                            minima: temperatura,
                            maxima: temperatura,
                            condicoes: {}
                        };
                    } else {
                        if (temperatura < previsoesPorDia[dia].minima) {
                            previsoesPorDia[dia].minima = temperatura;
                        }
                        if (temperatura > previsoesPorDia[dia].maxima) {
                            previsoesPorDia[dia].maxima = temperatura;
                        }
                    }

                    if (!previsoesPorDia[dia].condicoes[condicao]) {
                        previsoesPorDia[dia].condicoes[condicao] = 1;
                    } else {
                        previsoesPorDia[dia].condicoes[condicao]++;
                    }
                });

                var resultadoHTML = `<h2>Previsão do Tempo para os Próximos 5 Dias em ${data.city.name}</h2>`;
                resultadoHTML += '<div class="previsoes-container">';

                for (var dia in previsoesPorDia) {
                    var condicaoPredominante = Object.keys(previsoesPorDia[dia].condicoes).reduce((a, b) => 
                        previsoesPorDia[dia].condicoes[a] > previsoesPorDia[dia].condicoes[b] ? a : b
                    );

                    resultadoHTML += `
                        <div class="previsao-item">
                            <p><strong>Dia ${dia}</strong></p>
                            <p><strong>Condição:</strong> ${condicaoPredominante}</p>
                            <p><strong>Temperatura Mínima:</strong> ${previsoesPorDia[dia].minima} °C</p>
                            <p><strong>Temperatura Máxima:</strong> ${previsoesPorDia[dia].maxima} °C</p>
                        </div>
                    `;
                }

                resultadoHTML += '</div>';

                document.getElementById('weather-result').innerHTML = resultadoHTML;
                
            } else {
                document.getElementById('weather-result').innerHTML = `<p>Erro: ${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-result').innerHTML = `<p>Erro na requisição: ${error.message}</p>`;
        });
}
