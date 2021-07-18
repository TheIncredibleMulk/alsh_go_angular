import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface INewsfeedItem {
  title: string,
  post: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = ''
  public post = ''
  public newsfeedItems: INewsfeedItem[] = [
    {
      title: 'Hello',
      post: 'first post'
    },
    {
      title: 'another one',
      post: 'another value'
    },
  ]

  constructor(
    private httpClient: HttpClient
  ) {}

  async ngOnInit() {
    await this.loadnewsItems()

    setInterval (() => this.loadnewsItems(), 2000)  //maybe use a websocket or "long polling"
  }

  async loadnewsItems() {
    this.newsfeedItems = await this.httpClient.get<INewsfeedItem[]>('/api/newsfeed').toPromise()
  }

  async addPost(){
    await this.httpClient.post('/api/newsfeed', {
      title: this.title,
      post: this.post
    }).toPromise()

    await this.loadnewsItems()

    this.title = ''
    this.post = ''
  }
  
}
 

// localhost:4200/pull