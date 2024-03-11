-- CreateTable
CREATE TABLE "IpAddress" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "IpAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpAddressesOnUsers" (
    "userId" INTEGER NOT NULL,
    "ipAddressId" INTEGER NOT NULL,

    CONSTRAINT "IpAddressesOnUsers_pkey" PRIMARY KEY ("userId","ipAddressId")
);

-- CreateTable
CREATE TABLE "_IpAddressToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IpAddressToUser_AB_unique" ON "_IpAddressToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IpAddressToUser_B_index" ON "_IpAddressToUser"("B");

-- AddForeignKey
ALTER TABLE "IpAddressesOnUsers" ADD CONSTRAINT "IpAddressesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAddressesOnUsers" ADD CONSTRAINT "IpAddressesOnUsers_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "IpAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IpAddressToUser" ADD CONSTRAINT "_IpAddressToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "IpAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IpAddressToUser" ADD CONSTRAINT "_IpAddressToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
