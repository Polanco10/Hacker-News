import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/shared/components/select/select.component';
import { FilterHitsPipe } from 'src/app/shared/pipes/filter-hits.pipe';
import { Ihits } from './models/news.models';
import { NewsService } from './services/news.service';

export interface IUrlParam {
  query: string,
  page: number
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnDestroy {
  currentServerPage = 0; // to call pages from 0 to 49
  currentVisualPage = 1; // to handle pages from 1 to 50
  hits!: Ihits[]
  totalPages: number = 1 //number of pages
  newsSub: Subscription = Subscription.EMPTY;
  query: string = ''

  constructor(private newsService: NewsService, private filterHitsPipe: FilterHitsPipe, private router: Router, private route: ActivatedRoute) {
    let urlParamLocal = localStorage.getItem('params')
    if (urlParamLocal) {
      let jsonUrlParam = JSON.parse(urlParamLocal)
      this.currentVisualPage = jsonUrlParam.page
      this.currentServerPage = this.currentVisualPage - 1
      this.query = jsonUrlParam.query
    }

    this.handleQuery()

  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe()
  }
  public onGoTo(page: number): void {
    this.currentVisualPage = page;
    this.currentServerPage = page - 1
    this.handleQuery()
  }

  public onNext(page: number): void {
    this.currentVisualPage = page + 1;
    this.currentServerPage = page
    this.handleQuery()
  }

  public onPrevious(page: number): void {
    this.currentVisualPage = page - 1;
    this.currentServerPage = page - 2
    this.handleQuery()
  }

  public onSelect(item: Iitem) {
    this.query = item.value
    this.handleQuery()
  }

  changeQuery(queryParams: { query: string, page: number }) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams });
  }

  getNews(params: IUrlParam) {
    this.hits = []
    this.newsSub = this.newsService.getNews(params).subscribe(res => {
      this.hits = this.filterHitsPipe.transform(res.hits).slice(0, 8)
      this.totalPages = res.nbPages
    })
  }

  handleQuery() {
    this.getNews({ query: this.query, page: this.currentServerPage })
    this.changeQuery({ query: this.query, page: this.currentVisualPage })
    localStorage.setItem('params', JSON.stringify({ query: this.query, page: this.currentVisualPage }));
  }

  onFavSelected(selectedButton: string) {
    if (selectedButton === 'all') {
      this.handleQuery()
    } else {
      let favorites = localStorage.getItem('favorites')
      this.hits = []
      if (favorites) {
        this.hits = JSON.parse(favorites).map((el: Ihits) => { return { ...el, created_at: new Date(el.created_at) } })
      }
    }
  }
}
