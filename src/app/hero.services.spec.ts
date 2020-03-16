import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing'
import { MessageService } from "./message.service";
import { HeroService } from "./hero.service";

describe('HeroService' , () => {
    let mockMessageService
    let httpTestingController : HttpTestingController
    let service;
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule],
            providers : [HeroService, {provide : MessageService , useValue : mockMessageService}]
        })
        httpTestingController = TestBed.get(HttpTestingController)
        service = TestBed.get(HeroService)
    })

    describe('getHeroes' , () => {
        it('should call get with correct URL' , () => {
            service.getHero(4).subscribe()
            //service.getHero(3).subscribe()
            httpTestingController.expectOne('api/heroes/4').flush({id : 4 , name : 'SpiderDude' , strength : 1})
            httpTestingController.verify()
        }) 
    })
})