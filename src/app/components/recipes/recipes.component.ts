import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
