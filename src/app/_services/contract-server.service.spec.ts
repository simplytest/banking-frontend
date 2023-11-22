import { TestBed } from "@angular/core/testing";

import { ContractServerService } from "./contract-server.service";
import { HttpClientModule } from "@angular/common/http";
import { AccountType } from "../types/account";

describe("ContractServerService", () =>
{
    let service: ContractServerService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientModule,]
        });
        service = TestBed.inject(ContractServerService);
    });

    it("should be created", () =>
    {
        expect(service).toBeTruthy();
        service.addAccount("test", AccountType.GiroAccount);
    });
});
