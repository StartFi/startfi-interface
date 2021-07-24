export const calculateTimeLeft= (expireTimeStamp: number) => {
    let difference=expireTimeStamp-Date.now()
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60)
      };
    }
      return timeLeft;
  };