import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

//mocking routerlink
@Directive({
    selector : '[routerLink]',
    host : {'(click)' : 'onClick()'}
})

export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams : any;
    navigatedTo : any = null
    onClick(){
        this.navigatedTo = this.linkParams
    }
}

describe('Heroes Component (shallow tests)' , () => {
    let fixture : ComponentFixture<HeroesComponent>
    let mockHeroService;
    let HEROES;
         
    beforeEach(() => {
        HEROES = [{ id: 1, name: 'SpiderDude', strength: 8 }, { id: 2, name: 'Wonderful Woman', strength: 15 }]
        mockHeroService = jasmine.createSpyObj(['getHeroes' , 'addHero' , 'deleteHero'])
        TestBed.configureTestingModule({
            declarations : [HeroesComponent , HeroComponent , RouterLinkDirectiveStub],
            providers : [{provide : HeroService , useValue : mockHeroService}],
            //schemas : [NO_ERRORS_SCHEMA]
        })
        
        fixture = TestBed.createComponent(HeroesComponent)
    })
   it('should render each hero as HeroComponent' , () => {
       mockHeroService.getHeroes.and.returnValue(of(HEROES))
       fixture.detectChanges()
       const heroComponentDE = fixture.debugElement.queryAll(By.directive(HeroComponent))
       expect(heroComponentDE.length).toBe(2)
   })


   //triggering events on elements

   it('should call heroService.deleteHero when delete button is clicked on HeroComponent', () => {
       spyOn(fixture.componentInstance , 'delete')
       mockHeroService.getHeroes.and.returnValue(of(HEROES))
       fixture.detectChanges()
       let heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))
       heroComponents[0].query(By.css('button')).triggerEventHandler('click' , {stopPropagation : () =>{}})
       expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]) 
   })


   //interacting with input boxes

   it('should add a new hero when add button is clicked' , () => {
       mockHeroService.getHeroes.and.returnValue(of(HEROES))
       fixture.detectChanges()
       let name = 'Mr Ice'
       mockHeroService.addHero.and.returnValue(of({id : 3 , name : name , strength : 4}))
       let input = fixture.debugElement.query(By.css('input')).nativeElement
       input.value = name
       let addButton = fixture.debugElement.query(By.css('button'))
       addButton.triggerEventHandler('click' , null)
       fixture.detectChanges()
       let heroComponents = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
       expect(heroComponents).toContain(name)
   })

   //testing routerlink
    it('should have correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))

        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub)

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null)
        expect(routerLink.navigatedTo).toBe('/detail/1')
    })
})