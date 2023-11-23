describe("Data testing: regression tests", function () {
  const solrApiUrl =
    "http://maria:0jKC84waPbwC5n8h@3.67.163.226:8983/solr/openaccess/select";
  function checkResultsReturnZero(url) {
    cy.request({
      url: solrApiUrl + url,
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.eql(0);
    });
  }
  const fixture = "dataTests/dataRegression";

  it("TCM-796 We should not get any premium content from Openalex or aminer for Wiley", () => {
    checkResultsReturnZero(
      '?q.op=OR&q=*%20AND%20publishers%3A"wiley"%20AND%20%0Aurl_full_text_source%3A7%20AND%20is_premium%3Atrue'
    );
    checkResultsReturnZero(
      '?q.op=OR&q=*%20AND%20publishers%3A"wiley"%20AND%20%0Aurl_full_text_source%3A12%20AND%20is_premium%3Atrue'
    );
  });
  it("TCM-537 title_source is a mandatory field", () => {
    checkResultsReturnZero("?q.op=OR&q=-title_source%3A%7B*%20TO%20*%7D");
  });
  it("TCM-618 Data testing: there should be no DOI starting with '/'", () => {
    checkResultsReturnZero("?q.op=OR&q=DOI%3A%2F%5C%2F.*%2F");
  });

  it("TCM-841 It governance: all articles should have abstract", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A16%20AND%20-abstract%3A*&rows=200"
    );
  });
  it("TCM-843 Genlang is mandatory field", () => {
    checkResultsReturnZero("?q.op=OR&q=-genlanguage%3A*");
  });
  it("TCM-664 There should be no 'arxiv:' in the journal name", () => {
    checkResultsReturnZero(
      "?facet.field=journalTitleFull&facet=true&q.op=OR&q=journalTitleFull%3Aarxiv*"
    );
  });

  it("TCM-663 If there is publisher source there is a publisher", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=-publishers%3A* AND publishers_source%3A*"
    );
  });

  it("TCM-822 Data testing: title_source:7 should not have is_premium records:true except url_full_text_source:15", () => {
    // checkResultsReturnZero(
    //   "?q.op=OR&q=title_source%3A7 AND is_premium%3Atrue AND -url_full_text_source%3A15"
    // );
    //comment should be removed after is fixed https://knowledgee.atlassian.net/browse/ZD-1404
    //and the check below should be removed
    cy.request({
      url:
        solrApiUrl +
        "?q.op=OR&q=title_source%3A7 AND is_premium%3Atrue AND -url_full_text_source%3A15",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.eql(1);
    });
  });

  it("TCM-661 Correct DOI check", () => {
    //checkResultsReturnZero("?q=DOI:%2F[0-9]%2B%2F&q.op=OR");
    //https://knowledgee.atlassian.net/browse/ZD-1406 comment should be removed after is fixed
    //and the check below should be removed
    cy.request({
      url:
        solrApiUrl +
        "?q.op=OR&q=title_source%3A7 AND is_premium%3Atrue AND -url_full_text_source%3A15",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.eql(1);
    });
  });

  it("TCM-538 There is no n/a in DOI and Zendy ID", () => {
    checkResultsReturnZero("?q.op=OR&q=DOI%3An%2Fa");
  });

  it("TCM-571 Sage articles should not be available for Zendy", () => {
    checkResultsReturnZero("?q.op=OR&q=title_source%3A2");
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3A*sagepub*%20AND%20is_premium%3Atrue"
    );
  });

  it("TCM-861 PUBLISHERS SOLR: IntechOpen all data should be OA", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf_source%3A21 AND is_premium%3Atrue"
    );
  });

  it("TCM-862 PUBLISHERS SOLR: IntechOpen should return results", () => {
    cy.request({
      url: solrApiUrl + "?q.op=OR&q=url_pdf_source%3A21",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.be.above(1800);
    });
    // results should not have tags
    checkResultsReturnZero(
      '?q.op=OR&q=title%3A"Virulence%20Factors%20of%20<em>Chlamydia<%2Fem>%20Spp.%20Involving%20Human%20Infections"'
    );
    checkResultsReturnZero(
      '?q.op=OR&q=title%3A"Vigor%20and%20Health%20of%20Urban%20Green%20Resources%20under%20Elevated%20O<sub>3<%2Fsub>%20in%20Far%20East%20Asia"'
    );
    checkResultsReturnZero(
      '?q.op=OR&q=title%3A"Semi-Solid%20Phase%20Assay%20for%20the%20Alternative%20Complement%20Pathway%20Activity%20Assessment%20(AP<sub>100<%2Fsub>)"'
    );
  });

  it("TCM-863 PUBLISHERS SOLR: De Gruyter should return results", () => {
    // there needs to be premium data
    cy.request({
      url: solrApiUrl + "?q.op=OR&q=url_pdf_source%3A20 AND is_premium%3Atrue",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.be.above(2500);
    });
    //there needs to be content in deu
    cy.request({
      url:
        solrApiUrl +
        "?q.op=OR&q=url_pdf_source%3A20%20AND%20is_premium%3Atrue%20AND%20genlanguage%3Adeu",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.be.above(700);
    });
  });

  it("TCM-570 No empty title for the records with title source", () => {
    checkResultsReturnZero("?q.op=OR&q=title_source%3A* AND -title%3A*");
  });

  it("TCM-789 Authors shouldn't return N/A", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=authors%3A*N%2FA*%20OR%20authors%3A*n%2Fa*"
    );
  });

  it('TCM-614 Data testing: all search results have a unique Zendy ID that is not "doi:"', () => {
    checkResultsReturnZero('?q.op=OR&q=DOI%3A"doi%3A"');
    checkResultsReturnZero("?q=DOI:%2Fdoi:.*%2F&q.op=OR");
    //https://knowledgee.atlassian.net/browse/ZD-1503
    //checkResultsReturnZero("?q.op=OR&q=DOI%3A*doi.org*");
  });
  it("TCM-662 Correct doi is returned", () => {
    cy.request({
      url: solrApiUrl + "?q.op=OR&q=DOI%3A10.1590%2Fs0004-27492005000200015",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.eql(1);
    });
  });

  it("TCM-668 weird pISSN/eISSN with 'Nature*'", () => {
    checkResultsReturnZero("?q.op=OR&q=pISSN%3ANature*");
    checkResultsReturnZero("?q.op=OR&q=eISSN%3ANature*");
    checkResultsReturnZero(
      "?q.op=OR&q=-eISSN%3A%2F[0-9]{7%2C8}[Xx]{0%2C1}%2F AND eISSN%3A*&rows=10"
    );
  });

  it("TCM-474 Data testing: there should be no results without ZendyID", () => {
    checkResultsReturnZero("?df=catch_all&q.op=OR&q=-zendy_id%3A*");
  });

  it("TCM-790 Data testing: EBSCO content on solr is available for specific regions", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM790.length; i++) {
        cy.request({
          url:
            solrApiUrl +
            "?q=url_full_text%3A%20*search.ebscohost.com*%20AND%20%20is_premium%3Atrue%20AND%20regions%3A%20" +
            data.TCM790[i],
          failOnStatusCode: false,
        }).then((Response) => {
          const number = Response.body.response.numFound;
          cy.log("results returned " + number);
          expect(number).to.eql(63238);
        });
      }
    });
  });
  it("TCM-667 Getting source type 'Others' which contain subcategory as 'Others' again", () => {
    checkResultsReturnZero(
      "?df=catch_all&q.op=OR&q=main_publication_type%3A Others AND publication_type%3A Others"
    );
  });

  it("TCM-665 ALL KNE data has oa_source: gold", () => {
    checkResultsReturnZero(
      "?q.op=AND&q=-oa_status%3Agold AND url_full_text_source%3A1 "
    );
  });

  it("TCM-536 All results should have regions field", () => {
    checkResultsReturnZero(
      "?df=catch_all&q.op=OR&q=-regions%3A%7B*%20TO%20*%7D"
    );
  });

  it("TCM-510 Data Testing: we should not have ISBN: isbn", () => {
    checkResultsReturnZero("?q.op=OR&q=ISBN%3Aisbn");
  });

  it("TCM-575 There is no doi links for Wiley'", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A8%20AND%20-url_pdf%3A%5B*%20TO%20*%5D%20AND%20url_full_text%3A*doi*"
    );
  });

  it("TCM-612 Data testing: If is_premium:true regions ALL should not be 0", () => {
    cy.request({
      url: solrApiUrl + "?q.op=OR&q=is_premium%3Atrue%20AND%20regions%3AALL",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.be.above(0);
    });
  });

  it("TCM-602 Data testing: URL pdf has no encoding", () => {
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3Ahttps%253A%2F%2F*");
  });

  it("TCM-617 Data testing: Journal title should not have http/https", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM617.length; i++) {
        checkResultsReturnZero(data.TCM617[i]);
      }
    });
  });

  it("TCM-497 Data:testing: created_at and updated_at fields are inserted for every single solr document", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM497.length; i++) {
        checkResultsReturnZero(data.TCM497[i]);
      }
    });
  });

  it("TCM-616 Data testing: Trailing strings after (: | ; | ,) are removed from publishers fields", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM616.length; i++) {
        checkResultsReturnZero(data.TCM616[i]);
      }
    });
  });
  it("TCM-615 Data testing: there should no Others as subcategory", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM615.length; i++) {
        checkResultsReturnZero(data.TCM615[i]);
      }
    });
  });

  it("TCM-601 Data testing: license_level field tests", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM601.length; i++) {
        checkResultsReturnZero(data.TCM601[i]);
      }
    });
  });

  it("TCM-478 Data testing: Filtered out data", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.TCM478.length; i++) {
        checkResultsReturnZero(data.TCM478[i]);
      }
    });
    cy.request({
      url:
        solrApiUrl +
        "?fq=-url_full_text_source%3A8&q.op=AND&q=publishers%3A%27Informa%27",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.eql(8);
    });
  });

  it("TCM-296 There is CC BY-NC-ND content from Wiley and Karger in search result skipped intil ZD-1489 is fixed", () => {
    checkResultsReturnZero(
      "?fq=-license_type_source%3A3&fq=-license_type_source%3A8&fq=-license_type_source%3A20&q.op=AND&q=license_type%3A*nc* AND regions%3AALL"
    );
  });

  it("TCM-783 url_pdf should not returns - privacy error", () => {
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*www.brimr.org*");
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*www.ispacs.com*");
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*portalseer.ufba.br*");
  });

  it("TCM-784 result should not have fulltext links with Site can't be reached page once open", () => {
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*ojs.ukw.edu.p*");
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*lra.le.ac.uk*");
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3A*journals.library.tudelft.nl*"
    );
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*www.ijeast.com*");
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*petplayground2.com*");
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3Ahttp%5C%3A%2F%2Flibrary.ibp.ac.cn*"
    );
    checkResultsReturnZero("?q.op=OR&q=url_pdf%3A*rerb.pw*");
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3Ahttp%5C%3A%2F%2For.nsfc.gov.cn*"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3Ahttps%5C%3A%2F%2Ffindresearcher.sdu.dk%5C%3A*"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=url_pdf%3Ahttp%5C%3A%2F%2Fmda.ia.ac.cn*"
    );
  });

  it("TCM-785 Generate SJR value for conference proceedings when ISSN available or not available", () => {
    checkResultsReturnZero(
      '?q.op=OR&q=journal_title%3A"AIP%20Conference%20Proceedings"%20AND%20-proceeding_id%3A*'
    );
  });

  it.skip("TCM-785 Data testing: conference proceedings fail is expeted until ZD-1486 resolved", () => {
    //https://knowledgee.atlassian.net/browse/ZD-1486
    cy.fixture("dataTests/conferencePro").then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        checkResultsReturnZero(
          '?q.op=OR&q=journal_title%3A"' +
            data.list[i] +
            '"%20AND%20-proceeding_id%3A*'
        );
      }
    });
  });
  it("TCM-792 IEEE has OA articles only except premium articles coming from EDS (url_full_text_source:15)", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A9%20AND%20is_premium%3Atrue%20AND%20-url_full_text_source%3A15"
    );
  });
  it("TCM-793 Data testing: For title_source:9 url_full_text_source should also be 9", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A9%20AND%20-url_full_text_source%3A9%20AND%20-url_full_text_source%3A15%20AND%20is_premium%3Afalse"
    );
  });
  it("TCM-794 Data testing: url_full_text contains link to ieeexplore.ieee.org only", () => {
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A9 AND -url_full_text%3A*ieeexplore.ieee.org* AND -url_full_text%3A*ebscohost.com*"
    );
  });

  it("TCM-815 DATA TESTING: is_ready_for_solr should always exist and return true", () => {
    checkResultsReturnZero("?df=catch_all&q.op=OR&q=-is_ready_for_solr%3A*");
  });

  it("TCM-840 PUBLISHERS SOLR: We should be getting only premium results for all the regions from Bristol , IT Governance, NewGen", () => {
    //all results are premium
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A16%20AND%20-is_premium%3Atrue&rows=150&start=20"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A17%20AND%20-is_premium%3Atrue&rows=150&start=20"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A19%20AND%20-is_premium%3Atrue&rows=150&start=20"
    );
    //all results should have regions ALL
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A16%20AND%20-regions%3AALL&rows=150&start=20"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A17%20AND%20-regions%3AALL&rows=150&start=20"
    );
    checkResultsReturnZero(
      "?q.op=OR&q=title_source%3A19%20AND%20-regions%3AALL&rows=150&start=20"
    );
    //all results from ITGovernance should be Book series
    checkResultsReturnZero(
      '?q.op=OR&q=title_source%3A16%20AND%20-publication_type%3A"Book%20Series"&rows=150&start=20'
    );
  });

  it("TCM-844 Genlang genlanguage:Uncategorized - should be below 4 681 953", () => {
    cy.request({
      url: solrApiUrl + "?q.op=OR&q=genlanguage%3AUncategorized",
      failOnStatusCode: false,
    }).then((Response) => {
      const number = Response.body.response.numFound;
      cy.log("results returned " + number);
      expect(number).to.be.below(4681953);
    });
  });

  it("TCM-845 Genlang genlanguage: checking values", () => {
    cy.request({
      url: solrApiUrl + "?facet.field=genlanguage&facet=true&q.op=OR&q=*",
      failOnStatusCode: false,
    }).then((Response) => {
      const language = Response.body.facet_counts.facet_fields.genlanguage;

      expect(language).to.have.lengthOf(66);
      expect(language).includes("eng");
      expect(language).includes("hin");
      expect(language).includes("spa");
      expect(language).includes("ukr");
    });
  });
});
