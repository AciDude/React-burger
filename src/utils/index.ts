export function getDate(date: string) {
  const createdDate = new Date(date)
  const createdTime = createdDate.toLocaleTimeString('ru', {
    hour: 'numeric',
    minute: 'numeric'
  })
  const defDays =
    (new Date().setHours(0, 0, 0, 0) - createdDate.setHours(0, 0, 0, 0)) /
    1000 /
    60 /
    60 /
    24

  let dateInfo

  switch (defDays) {
    case 0: {
      dateInfo = 'Сегодня'
      break
    }
    case 1: {
      dateInfo = 'Вчера'
      break
    }
    case 2:
    case 3: {
      dateInfo = `${defDays} дня назад`
      break
    }
    default: {
      dateInfo = createdDate.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric'
      })
    }
  }
  return [dateInfo, createdTime]
}

export function getStatusText(status: string) {
  switch (status) {
    case 'created': {
      return 'Создан'
    }
    case 'pending': {
      return 'Готовтся'
    }
    case 'done': {
      return 'Выполнен'
    }
  }
}

export const isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
