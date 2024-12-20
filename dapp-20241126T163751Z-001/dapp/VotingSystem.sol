//Ethereum smart contract for Election System (Voting Process) 
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.8.27;

contract VotingSystem {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor ()  {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
	addCandidate("Candidate 3");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender],'You have already voted!');

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    } 
   function getCandidateDetails(uint _candidateId) public view returns (uint , string memory, uint)
   {
      return (candidates[_candidateId].id,candidates[_candidateId].name,candidates[_candidateId].voteCount);  
   }

}