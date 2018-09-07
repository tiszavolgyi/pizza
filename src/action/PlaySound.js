import { Audio } from 'expo'

export const playSound = () => {
  loadAndPlay().then(() => {
    console.log('sound played')
  }).catch((error) => {
    console.log(error)
  })
}

const loadAndPlay = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../assets/alarm-frenzy.mp3'));
    await soundObject.playAsync();
  } catch (error) {

  }
}
