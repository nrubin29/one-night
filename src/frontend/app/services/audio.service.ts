import {Injectable} from '@angular/core';

@Injectable()
export class AudioService {
  private backgroundAudio: HTMLAudioElement;
  private roleAudio: HTMLAudioElement;

  constructor() {
    this.backgroundAudio = new Audio();
    this.roleAudio = new Audio();
  }

  playBackground(file: string) {
    this.backgroundAudio.src = `/assets/sounds/background_${file}.mp3`;
    this.backgroundAudio.oncanplay = (e: any) => {
      this.backgroundAudio.play();
    };
  }

  pauseBackground() {
    this.backgroundAudio.pause();
  }

  playRole(file: string) {
    this.roleAudio.src = `/assets/sounds/en_male_${file}.mp3`;
    this.roleAudio.oncanplay = (e: any) => {
      this.roleAudio.play();
    };
  }

  // pauseRole() {
  //   this.roleAudio.pause();
  // }
}
