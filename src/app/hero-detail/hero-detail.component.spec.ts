import { TestBed, fakeAsync, tick, flush } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import {Location} from '@angular/common'
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

// testing with activatedroute

describe('Hero Detail Component' , () => {
    let mockHeroService
    let mockLocation
    let mockActivatedRoute
    let fixture;
    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero' , 'updateHero'])
        mockLocation = jasmine.createSpyObj(['back'])
        mockActivatedRoute = {snapshot : {paramMap : {get : () => { return '3' }}}}

        TestBed.configureTestingModule({
            imports : [FormsModule],
            declarations : [HeroDetailComponent],
            providers : [{provide : HeroService , useValue : mockHeroService} , 
                         {provide : Location , useValue : mockLocation},
                         {provide : ActivatedRoute , useValue : mockActivatedRoute}
                        ],
        })
        fixture = TestBed.createComponent(HeroDetailComponent)
        
    })

    it('should render hero name in h2 tag' , () => {
        mockHeroService.getHero.and.returnValue(of({id : 1 , name : 'SuperDude' , strength : 100}))
        fixture.detectChanges()
        let heroDetailDE = fixture.debugElement.query(By.css('h2')).nativeElement.textContent
        expect(heroDetailDE).toContain('SUPERDUDE')
    })

    //basic async testing 

    // it('should call updateHero when save is called' , (done) => {
    //     mockHeroService.getHero.and.returnValue(of({id : 1 , name : 'SuperDude' , strength : 100}))
    //     mockHeroService.updateHero.and.returnValue(of({}))
    //     fixture.detectChanges()
    //     fixture.componentInstance.save()
    //     setTimeout(() => {
    //          expect(mockHeroService.updateHero).toHaveBeenCalled()
    //          done()
    //     } , 300)
        
    // })

    //using fakeasync helper function 

    it('should call updateHero when save is called' , fakeAsync(() => {
        mockHeroService.getHero.and.returnValue(of({id : 1 , name : 'SuperDude' , strength : 100}))
        mockHeroService.updateHero.and.returnValue(of({}))
        fixture.detectChanges()
        fixture.componentInstance.save()
        //tick(250)   ----> when time to wait is known
        flush()  //----->  when time to wait is not known
        expect(mockHeroService.updateHero).toHaveBeenCalled()
    }))
    
})