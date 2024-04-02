include .env


deployENS:
	forge create --rpc-url ${URL} \
    --private-key ${PRIVATE_KEY} \
    --etherscan-api-key ${ETHERSCAN_API_KEY} \
    --verify \
    src/ENS.sol:ENSContract


deployChat:
	forge create --rpc-url ${URL} \
    --constructor-args $(ensAddress) \
    --private-key ${PRIVATE_KEY} \
    --etherscan-api-key ${ETHERSCAN_API_KEY} \
    --verify \
    src/Chat.sol:ChatDApp