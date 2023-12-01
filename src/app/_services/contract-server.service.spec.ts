import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ContractServerService } from "./contract-server.service";

const token = "test";
const url = "http://localhost:5005/api/contracts";

const expectedJson = {
    "id": {
        "counter": 1,
        "parent": 1,
        "child": 0
    },
    "customer": {
        "type": "com.simplytest.core.customers.CustomerPrivate",
        "data": {
            "birthDay": "Dec 11, 2000, 12:00:00 AM",
            "schufaScore": 0.0,
            "transactionFee": 0.0,
            "monthlyFee": 2.99,
            "firstName": "giro_Only",
            "lastName": "customer",
            "address": {
                "country": "germany",
                "zipCode": "99817",
                "street": "Wiener Straße",
                "house": "1",
                "city": "Nürnberg",
                "email": "Test@e-Mail.de"
            }
        }
    },
    "accounts": {},
    "00001:00001": {
        "type": "com.simplytest.core.accounts.AccountGiro",
        "data": {
            "sendLimit": 3000.0,
            "dispoLimit": 0.0,
            "dispoRate": 0.0,
            "balance": 0.0,
            "boundPeriod": 0.0,
            "interestRate": 0.0
        }
    }
};

let requestJson;

const actualjson = {
    "id": {
        "counter": 1,
        "parent": 1,
        "child": 0
    },
    "customer": {
        "type": "com.simplytest.core.customers.CustomerPrivate",
        "data": {
            "birthDay": "Dec 11, 2000, 12:00:00 AM",
            "schufaScore": 0.0,
            "transactionFee": 0.0,
            "monthlyFee": 2.99,
            "firstName": "giro_Only",
            "lastName": "customer",
            "address": {
                "country": "germany",
                "zipCode": "99817",
                "street": "Wiener Straße",
                "house": "1",
                "city": "Nürnberg",
                "email": "Test@e-Mail.de"
            }
        }
    },
    "accounts": {},
    "00001:00001": {
        "type": "com.simplytest.core.accounts.AccountGiro",
        "data": {
            "sendLimit": 3000.0,
            "dispoLimit": 0.0,
            "dispoRate": 0.0,
            "balance": 0.0,
            "boundPeriod": 0.0,
            "interestRate": 0.0
        }
    }
};

describe("HttpClient testing", () =>
{
    let contractService: ContractServerService;
    let controller: HttpTestingController;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContractServerService]
        });

        contractService = TestBed.inject(ContractServerService);
        controller = TestBed.inject(HttpTestingController);
    });

    it("getContracts()", () =>
    {
        contractService.getContract(token).subscribe(
            (contract) =>
            {
                requestJson = contract;
            }
        );

        const request = controller.expectOne(url);
        request.flush(actualjson);

        expect(expectedJson).toEqual(requestJson);
    });
});
