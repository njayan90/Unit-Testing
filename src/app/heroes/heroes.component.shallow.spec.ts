import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
//import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Component, Input } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";


describe('Heroes Component (shallow tests)' , () => {
    let fixture : ComponentFixture<HeroesComponent>
    let mockHeroService;
    let HEROES;
    @Component({
        selector: 'app-hero',
        template : '<div></div>'
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();

      }
      
    beforeEach(() => {
        HEROES = [{ id: 1, name: 'SpiderDude', strength: 8 }, { id: 2, name: 'Wonderful Woman', strength: 15 }]
        mockHeroService = jasmine.createSpyObj(['getHeroes' , 'addHero' , 'deleteHero'])
        TestBed.configureTestingModule({
            declarations : [HeroesComponent , FakeHeroComponent],
            //schemas : [NO_ERRORS_SCHEMA],
            providers : [{provide : HeroService , useValue : mockHeroService}]
        })
        
        fixture = TestBed.createComponent(HeroesComponent)
    })

   it('should set heroes correctly from the service' , () => {
       mockHeroService.getHeroes.and.returnValue(of(HEROES))
       fixture.detectChanges()
       expect(fixture.componentInstance.heroes.length).toBe(2)
    })

    it('should create on li for each hero' , () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2)
    })

    it('should return if hero name is null' , () => {
        fixture.componentInstance.add('')
        fixture.componentInstance.heroes = HEROES
        //fixture.detectChanges()
        expect(fixture.componentInstance.heroes.length).toBe(2)
    })

    it('should add hero to the heroes list' , () => {
        let hero = {name : 'SuperDude' , strength : 11}
        mockHeroService.addHero.and.returnValue(of(hero))
        fixture.componentInstance.heroes = HEROES
        fixture.componentInstance.add('SuperDude')
        //fixture.detectChanges()
        expect(fixture.componentInstance.heroes.length).toBe(3)
    })

    it('should delete hero' , () => {
        mockHeroService.deleteHero.and.returnValue(of(true))
        fixture.componentInstance.heroes = HEROES
        fixture.componentInstance.delete(HEROES[1])
        expect(fixture.componentInstance.heroes.length).toBe(1)
    })
})