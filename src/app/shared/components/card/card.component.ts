import { Component, Input, OnInit } from '@angular/core';
import { faHeart as faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons'
import { faClock as faClock } from '@fortawesome/free-regular-svg-icons'
import { Ihits } from 'src/app/modules/news/models/news.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() hit!: Ihits

  author: string = ""
  story_title: string = ""
  story_url: string = ""
  created_at: Date = new Date()

  icon = fasHeart
  clock = faClock
  timeAgo: string = ""
  favorites: Ihits[] = []
  constructor() {

  }

  ngOnInit(): void {
    this.initVariables()
    this.convertTime()
    this.initFavorites()

  }
  initVariables() {
    this.author = this.hit.author
    this.story_title = this.hit.story_title
    this.story_url = this.hit.story_url
    this.created_at = this.hit.created_at
  }

  toggleFavItem() {
    if (this.icon == fasHeart) { //is favorite
      this.icon = faHeart
      if (this.isOnFavorites() === -1) {
        this.favorites.push(this.hit)
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    }
    else {
      let index = this.isOnFavorites()
      this.favorites.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.icon = fasHeart
    }
  }
  convertTime() {
    let miliseconds = new Date().getTime() - this.created_at.getTime()
    let seconds = miliseconds / 1000
    let minutes = Math.floor(seconds / 60)
    this.timeAgo = `${minutes} minutes ago by`
    let hours = Math.floor(minutes / 60)
    if (minutes > 60) {
      this.timeAgo = `${hours} hours ago by`
    }
    if (hours > 24) {
      let days = Math.floor(hours / 24)
      this.timeAgo = `${days} days ago by`
    }
  }

  isOnFavorites() {
    return this.favorites.findIndex(el => el.objectID === this.hit.objectID)
  }

  initFavorites() {
    let favStorage = localStorage.getItem('favorites')
    if (favStorage) this.favorites = JSON.parse(favStorage)
    let index = this.isOnFavorites()
    if (index > -1) { //Si está en los favoritos del localhost, setear icono
      this.icon = faHeart

    }
  }


}
