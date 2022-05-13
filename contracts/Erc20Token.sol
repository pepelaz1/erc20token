//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Erc20Token {

    uint256 private totalAmount = 10000;

    string private tokenName = "Pepelaz";

    string private tokenSymbol = "PPLZ";

    mapping(address => uint256) balances;   

    mapping(address => mapping (address => uint256)) allowed;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    event Transfer(address indexed from, address indexed to, uint tokens);

    constructor() {
        balances[msg.sender] = totalAmount;
    }

    function name() public view returns (string memory) {
        return tokenName;
    }

    function symbol() public view returns (string memory) {
        return tokenSymbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return totalAmount;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

     function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }

    function transfer(address _to, uint256 _amount) public returns (bool) {
        require(_amount <= balances[msg.sender],"Not possible to transfer more than exising amount");
        balances[msg.sender] = balances[msg.sender] - _amount;
        balances[_to] = balances[_to] + _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public returns (bool) {
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint _amount) public returns (bool) {
        require(_amount <= balances[_from], "Not possible to transfer more than exising amount");
        require(_amount <= allowed[_from][msg.sender], "Not possible to transfer more than approved amount");
        balances[_from] = balances[_from] - _amount;
        allowed[_from][msg.sender] = allowed[_from][msg.sender] - _amount;
        balances[_to] = balances[_to] + _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }

    function mint(address _account, uint256 _amount) public  {
        totalAmount += _amount;
        balances[_account] += _amount;
        emit Transfer(address(0), _account, _amount);
    }

     function burn(address _account, uint256 _amount) public  {
        require(_amount <= balances[_account], "Not possible to burn more than exising amount");
        balances[_account] = balances[_account] - _amount;
        totalAmount -= _amount;
        emit Transfer(_account, address(0), _amount);
    }

}