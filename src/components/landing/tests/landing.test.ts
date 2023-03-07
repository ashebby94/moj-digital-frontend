import {mockRequest, mockResponse, RequestOutput, ResponseOutput} from "mock-req-res";
import {landingGet} from "../landing-controller";
import chai from "chai";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("landing controller", () => {
    let req: RequestOutput;
    let res: ResponseOutput;

    it("should render landing page", () => {
        req = mockRequest({
            path: "/",
            session: { name: null },
        });
        res = mockResponse();
        landingGet(req, res);
        expect(res.render).to.have.calledWith("landing/index.njk");
    });
})
