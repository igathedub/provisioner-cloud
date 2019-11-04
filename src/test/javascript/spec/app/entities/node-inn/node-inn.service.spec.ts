import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { NodeInnService } from 'app/entities/node-inn/node-inn.service';
import { INodeInn, NodeInn } from 'app/shared/model/node-inn.model';

describe('Service Tests', () => {
  describe('NodeInn Service', () => {
    let injector: TestBed;
    let service: NodeInnService;
    let httpMock: HttpTestingController;
    let elemDefault: INodeInn;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NodeInnService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NodeInn(
        0,
        'AAAAAAA',
        false,
        0,
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
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

      it('should create a NodeInn', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new NodeInn(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NodeInn', () => {
        const returnedFromService = Object.assign(
          {
            unicastAddress: 'BBBBBB',
            configComplete: true,
            defaultTTL: 1,
            cid: 'BBBBBB',
            blacklisted: true,
            uUID: 'BBBBBB',
            security: 'BBBBBB',
            crpl: 'BBBBBB',
            name: 'BBBBBB',
            deviceKey: 'BBBBBB',
            vid: 'BBBBBB',
            pid: 'BBBBBB'
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

      it('should return a list of NodeInn', () => {
        const returnedFromService = Object.assign(
          {
            unicastAddress: 'BBBBBB',
            configComplete: true,
            defaultTTL: 1,
            cid: 'BBBBBB',
            blacklisted: true,
            uUID: 'BBBBBB',
            security: 'BBBBBB',
            crpl: 'BBBBBB',
            name: 'BBBBBB',
            deviceKey: 'BBBBBB',
            vid: 'BBBBBB',
            pid: 'BBBBBB'
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

      it('should delete a NodeInn', () => {
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
