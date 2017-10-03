import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService, SearchService } from '../shared';

@Component({
	selector: 'my-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
	query;
	goals: string[] = [];
	results;
	adjustButtonClass = '';
	adjustActive = false;
	goalMap = {
		'Larger': 'lidt større',
		'Smaller': 'lidt mindre',
		'Cheaper': 'lidt billigere',
		'NewArea': 'i et andet område',
		'Parking': 'parkering',
	};

	constructor(
		public themeService: ThemeService,
		private route: ActivatedRoute,
		public router: Router,
		public searchService: SearchService,
	) {
		this.route.queryParams.subscribe((value) => {
			if (value.goals) {
				this.goals = Array.isArray(value.goals) ? value.goals.slice() : [value.goals];
			} else {
				this.goals = [];
			}
			this.query = Object.assign({}, value, { goals: this.goals });
		});

		themeService.setTheme('theme--light');
	}


	ngOnInit() {
		this.results = this.route.snapshot.data['results'];
	}

	toggleSelector() {
		if (this.adjustActive === false) {
			this.adjustButtonClass = 'results-in';
			this.adjustActive = true;
		} else {
			this.adjustButtonClass = 'results-out';
			this.adjustActive = false;
		}
	}

	goalsUpdated(goals) {
		let newQuery = Object.assign({}, this.query, { goals: goals });
		this.router.navigate(['/results'], { queryParams: newQuery });

		this.searchService
			.search(newQuery)
			.subscribe((result) => {
				this.results = result;
			});
	}

	getTranslatedGoals() {
		return this.goals.reduce((collector, current, index) => {
			if (index === 0) {
				return this.goalMap[current];
			}

			if (index === this.goals.length - 1) {
				collector += ' og ' + this.goalMap[current];
				return collector;
			}

			return collector + ', ' + this.goalMap[current];
		}, '');
	}
}
