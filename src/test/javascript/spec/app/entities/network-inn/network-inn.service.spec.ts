import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { NetworkInnService } from 'app/entities/network-inn/network-inn.service';
import { INetworkInn, NetworkInn } from 'app/shared/model/network-inn.model';

describe('Service Tests', () => {
  describe('NetworkInn Service', () => {
    let injector: TestBed;
    let service: NetworkInnService;
    let httpMock: HttpTestingController;
    let elemDefault: INetworkInn;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NetworkInnService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NetworkInn(0, 'AAAAAAA', 0, 0, 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a NetworkInn', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new NetworkInn(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NetworkInn', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            gobalTTL: 1,
            unicast: 1,
            networkKey: 'BBBBBB',
            keyIndex: 1,
            flagRefreshPhase: 1,
            flagIVUpdate: 1,
            ivIndex: 1,
            appKey: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of NetworkInn', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            gobalTTL: 1,
            unicast: 1,
            networkKey: 'BBBBBB',
            keyIndex: 1,
            flagRefreshPhase: 1,
            flagIVUpdate: 1,
            ivIndex: 1,
            appKey: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NetworkInn', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
